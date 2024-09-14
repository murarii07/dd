import io

import numpy as np
import torch
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from PIL import Image
from torchvision import transforms
from fastapi.middleware.cors import CORSMiddleware
from models import Generator

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


device = torch.device('cuda' if torch.cuda.is_available() else ('mps' if torch.backends.mps.is_available() else 'cpu'))
print(device)

checkpoint = torch.load('gan.pth', map_location=device)
model = Generator().to(device) # Change out_channels parameter for non 3-channel images
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    # transforms.Normalize((0.5,), (0.5,))
])

@app.post("/")
async def sar_to_optical(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert('L')
    img = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        out = model(img)
        out = out.squeeze().permute(1, 2, 0).cpu().numpy()
        out = (out+1)/2 * 255
        out = out.astype(np.uint8)

    color_img = Image.fromarray(out)
    bytes = io.BytesIO()
    color_img.save(bytes, format='PNG')
    bytes.seek(0)

    return StreamingResponse(bytes, media_type='image/png')

if __name__=='__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
