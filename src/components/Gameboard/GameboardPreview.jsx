import { useRef, useEffect } from "react"

export default function GameBoardPreview({ values, image }) {
  
    const images = [
        {
            src : values.empty1Image !== "" ? URL.createObjectURL(values.empty1Image) : "",
            x : 3120,
            y : 5125,
            width : 350,
            height : 350,
            rotation : 0 
        },
        {
            src : values.leftCornerImage !== "" ? URL.createObjectURL(values.leftCornerImage) : "",
            x : 300,
            y : 4995,
            width : 380,
            height : 380,
            rotation : 45  
        },
        {
            src : values.empty2Image !== "" ? URL.createObjectURL(values.empty2Image) : "",
            x : 220,
            y : 4020,
            width : 350,
            height : 350,
            rotation : 90 
        },
        {
            src : values.topLeftImage !== "" ? URL.createObjectURL(values.topLeftImage) : "",
            x : 200,
            y : 200,
            width : 450,
            height : 450,
            rotation : 135 
        },
        {
            src : values.empty3Image !== "" ? URL.createObjectURL(values.empty3Image) : "",
            x : 4025,
            y : 220,
            width : 350,
            height : 350,
            rotation : 180 
        },
        {
            src : values.topRightImage !== "" ? URL.createObjectURL(values.topRightImage) : "",
            x : 5000,
            y : 200,
            width : 450,
            height : 450,
            rotation : 225 
        },
        {
            src : values.empty4Image !== "" ? URL.createObjectURL(values.empty4Image) : "",
            x : 5120,
            y : 4020,
            width : 350,
            height : 350,
            rotation : 270 
        },
    ]

    const texts = [
        {
            text : values.startText, 
            fontSize : 140,
            fontWeight : "900",
            x : 5250,
            y : 5220,
            rotation : -45,
            maxWidth : 450,
            isCenter : true
        },
        {
            text : values.startText2, 
            fontSize : 55,
            fontWeight : "600",
            x : 5025,
            y : 5025,
            rotation : -45,
            maxWidth : 420,
            isCenter : false
        },

        {
            text : values.brownText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 4660,
            y : 5100,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.chestText, 
            fontSize : 60,
            fontWeight : "600",
            x : 4220,
            y : 4950,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.brownText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 3750,
            y : 5100,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.empty1Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 3295,
            y : 4950,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.station1Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 2840,
            y : 4950,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.blueText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 2385,
            y : 5100,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.chanceText, 
            fontSize : 60,
            fontWeight : "600",
            x : 1930,
            y : 4950,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.blueText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 1475,
            y : 5100,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.blueText3, 
            fontSize : 60,
            fontWeight : "500",
            x : 1020,
            y : 5100,
            rotation : 0,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.leftCornerText1, 
            fontSize : 60,
            fontWeight : "600",
            x : 320,
            y : 5000,
            rotation : 135,
            maxWidth : 450,
            isCenter : true
        },
        {
            text : values.leftCornerText1, 
            fontSize : 60,
            fontWeight : "600",
            x : 660,
            y : 5340,
            rotation : -45,
            maxWidth : 450,
            isCenter : true
        },
        {
            text : values.leftCornerText2, 
            fontSize : 80,
            fontWeight : "600",
            x : 480,
            y : 5570,
            rotation : 0,
            maxWidth : 450,
            isCenter : true
        },
        {
            text : values.leftCornerText2, 
            fontSize : 80,
            fontWeight : "600",
            x : 100,
            y : 5190,
            rotation : 90,
            maxWidth : 450,
            isCenter : true
        },

        {
            text : values.pinkText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 565,
            y : 4645,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.empty2Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 725,
            y : 4200,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.pinkText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 565,
            y : 3735,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.pinkText3, 
            fontSize : 60,
            fontWeight : "500",
            x : 565,
            y : 3280,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        
        {
            text : values.station2Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 725,
            y : 2845,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.orangeText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 565,
            y : 2390,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.chestText, 
            fontSize : 60,
            fontWeight : "600",
            x : 725,
            y : 1935,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.orangeText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 565,
            y : 1480,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.orangeText3, 
            fontSize : 60,
            fontWeight : "500",
            x : 565,
            y : 1025,
            rotation : 90,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.topLeftText1, 
            fontSize : 80,
            fontWeight : "900",
            x : 620,
            y : 620,
            rotation : 135,
            maxWidth : 450,
            isCenter : true
        },
        {
            text : values.topLeftText2, 
            fontSize : 80,
            fontWeight : "900",
            x : 220,
            y : 220,
            rotation : 135,
            maxWidth : 450,
            isCenter : true
        },

        {
            text : values.redText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 1020,
            y : 565,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.chanceText, 
            fontSize : 60,
            fontWeight : "600",
            x : 1475,
            y : 725,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.redText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 1930,
            y : 565,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.redText3, 
            fontSize : 60,
            fontWeight : "500",
            x : 2385,
            y : 565,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.station3Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 2820,
            y : 725,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.yellowText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 3275,
            y : 565,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.yellowText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 3730,
            y : 565,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.empty3Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 4185,
            y : 725,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.yellowText3, 
            fontSize : 60,
            fontWeight : "500",
            x : 4640,
            y : 565,
            rotation : 180,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.topRightText1, 
            fontSize : 80,
            fontWeight : "900",
            x : 5040,
            y : 620,
            rotation : 225,
            maxWidth : 450,
            isCenter : true
        },
        {
            text : values.topRightText2, 
            fontSize : 80,
            fontWeight : "900",
            x : 5450,
            y : 200,
            rotation : 225,
            maxWidth : 450,
            isCenter : true
        },

        {
            text : values.greenText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 5110,
            y : 1025,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.greenText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 5110,
            y : 1480,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.chestText, 
            fontSize : 60,
            fontWeight : "600",
            x : 4950,
            y : 1935,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.greenText3, 
            fontSize : 60,
            fontWeight : "500",
            x : 5110,
            y : 2390,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.station4Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 4950,
            y : 2845,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },

        {
            text : values.chanceText, 
            fontSize : 60,
            fontWeight : "600",
            x : 4950,
            y : 3280,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.darkBlueText1, 
            fontSize : 60,
            fontWeight : "500",
            x : 5110,
            y : 3755,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.empty4Text, 
            fontSize : 60,
            fontWeight : "600",
            x : 4950,
            y : 4190,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },
        {
            text : values.darkBlueText2, 
            fontSize : 60,
            fontWeight : "500",
            x : 5110,
            y : 4665,
            rotation : 270,
            maxWidth : 450,
            isCenter : false
        },

    ]
  
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const img = new Image()
        img.src = image

        img.onload = () => {
        
            canvas.width = img.width
            canvas.height = img.height

            ctx.globalCompositeOperation = "destination-over"
            ctx.fillStyle = values.boardColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(img, 0, 0, img.width, img.height)

            images.forEach(({ src, x, y, width, height, rotation }) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                  const aspectRatio = img.width / img.height;
                  let drawWidth, drawHeight, offsetX, offsetY;
        
                  if (width / height > aspectRatio) {
                    drawWidth = width;
                    drawHeight = width / aspectRatio;
                    offsetX = 0;
                    offsetY = (height - drawHeight) / 2;
                  } else {
                    drawHeight = height;
                    drawWidth = height * aspectRatio;
                    offsetX = (width - drawWidth) / 2;
                    offsetY = 0;
                  }
        
                  ctx.save(); // Mevcut durumunu kaydet
                  ctx.translate(x + width / 2, y + height / 2); // Resmi ortalamak için konumlandır
                  ctx.rotate((rotation * Math.PI) / 180); // Resmi döndür
                  ctx.drawImage(img, -width / 2, -height / 2, width, height); // Resmi çiz
                  ctx.restore(); // Durumu geri yükle
                };
              });
        

            // Yazıları ekle
            texts.forEach(({ text, fontSize, fontWeight, x, y, rotation, maxWidth, isCenter }) => {
                ctx.save() 
                ctx.translate(x, y) 
                ctx.rotate((rotation * Math.PI) / 180) 
                ctx.font = `${fontWeight} ${fontSize}px ${values.fontFamily}` 
                ctx.textAlign = "center"
                ctx.textBaseline = isCenter ? "middle" : "top" 
                ctx.fillStyle = values.textColor 
                // ctx.fillText(text, 0, 0) // Yazıyı çiz
                
                wrapText(ctx, text.toUpperCase(), 0, 0, maxWidth, fontSize);
                ctx.restore() // Durumu geri yükle
            })


        }

    }, [])

    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        const lines = [];
        
        words.forEach(word => {
          let testLine = line + word + ' ';
          let metrics = ctx.measureText(testLine);
          let testWidth = metrics.width;
          if (testWidth > maxWidth && line !== '') {
            lines.push(line);
            line = word + ' ';
          } else {
            line = testLine;
          }
        });
        lines.push(line);
    
        for(let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], x, y + i * lineHeight);
        }
      };
    


  return (
    <canvas ref={canvasRef} className="w-full" />
  )
}
