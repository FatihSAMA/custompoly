import React, { useState, useRef, useEffect } from 'react';

function Test() {
  const [formData, setFormData] = useState({
    property1: '',
    property2: '',
    // Diğer alanlar...
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'GAMEBOARD.jpg'; // Görüntü dosyasının yolu

    img.onload = () => {
      // Orijinal resim boyutlarını kullanarak canvas boyutlarını ayarlayın
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Önceki çizimleri temizle
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Metni yerleştirin
      ctx.font = '120px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(formData.property1, 100, 100); // Metnin pozisyonunu ayarlayın
      ctx.fillText(formData.property2, 200, 200); // Diğer metinler için de aynı işlemi tekrarlayın
    };
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'gameboard.png';
    link.click();
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="property1"
          value={formData.property1}
          onChange={handleChange}
          placeholder="Property 1"
        />
        <input
          type="text"
          name="property2"
          value={formData.property2}
          onChange={handleChange}
          placeholder="Property 2"
        />
        {/* Diğer alanlar */}
      </form>
      <canvas ref={canvasRef} style={{ border: '1px solid black', maxWidth: '100%', height: 'auto' }} />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default Test;
