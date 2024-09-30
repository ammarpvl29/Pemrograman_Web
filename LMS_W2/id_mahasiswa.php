<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student ID Card</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .card {
            width: 350px;
            height: 220px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4a0e4e;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 1.2em;
        }
        .content {
            padding: 15px;
            position: relative;
        }
        .photo {
            width: 100px;
            height: 100px;
            position: absolute;
            top: -50px;
            left: 15px;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .info {
            margin-top: 60px;
        }
        .name {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .id, .program {
            font-size: 0.9em;
            color: #555;
        }
        .barcode {
            margin-top: 15px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
        }
        .barcode-line {
            width: 3px;
            background-color: #000;
            margin: 0 1px;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            Universitas Telkom<br>Jakarta
        </div>
        <div class="content">
            <div class="photo">
                <img src="pointer_ammarp.png" alt="Foto Mahasiswa">
            </div>
            <div class="info">
                <div class="name">Ammar Pavel Zamora Siregar</div>
                <div class="id">ID: 1202224044</div>
                <div class="program">S1 Teknologi Informasi</div>
            </div>
            <div class="barcode">
                <script>
                    for (let i = 0; i < 40; i++) {
                        const height = Math.floor(Math.random() * 40) + 10;
                        document.write(`<div class="barcode-line" style="height: ${height}px;"></div>`);
                    }
                </script>
            </div>
        </div>
    </div>
</body>
</html>