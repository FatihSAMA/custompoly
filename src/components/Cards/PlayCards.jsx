import { useRef, useEffect } from "react"

export default function PlayCard({ values }) {

    const texts = [
        {
            text: values.chance1,
            x: 550,
            y: 590,
        },
        {
            text: values.chance2,
            x: 1650,
            y: 590,
        },
        {
            text: values.chance3,
            x: 2750,
            y: 590,
        },
        {
            text: values.chance4,
            x: 3850,
            y: 590
        },
        {
            text: values.chance5,
            x: 4950,
            y: 590,
        },
        {
            text: values.chance6,
            x: 550,
            y: 1325,
        },
        {
            text: values.chance7,
            x: 1650,
            y: 1325,
        },
        {
            text: values.chance8,
            x: 2750,
            y: 1325,
        },
        {
            text: values.chance9,
            x: 3850,
            y: 1325,
        },
        {
            text: values.chance10,
            x: 4950,
            y: 1325,
        },
        {
            text: values.chance11,
            x: 550,
            y: 2060,
        },
        {
            text: values.chance12,
            x: 1650,
            y: 2060,
        },

        {
            text: values.chest1,
            x: 3800,
            y: 2060,
        },
        {
            text: values.chest2,
            x: 4900,
            y: 2060,
        },
        {
            text: values.chest3,
            x: 500,
            y: 2795,
        },
        {
            text: values.chest4,
            x: 1600,
            y: 2795
        },
        {
            text: values.chest5,
            x: 2700,
            y: 2795,
        },
        {
            text: values.chest6,
            x: 3800,
            y: 2795,
        },
        {
            text: values.chest7,
            x: 4900,
            y: 2795,
        },
        {
            text: values.chest8,
            x: 500,
            y: 3530,
        },
        {
            text: values.chest9,
            x: 1600,
            y: 3530,
        },
        {
            text: values.chest10,
            x: 2700,
            y: 3530,
        },
        {
            text: values.chest11,
            x: 3800,
            y: 3530,
        },
        {
            text: values.chest12,
            x: 4900,
            y: 3530,
        },

        

    ]

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const img = new Image()
        img.src = "cards.jpg"

        img.onload = () => {

            canvas.width = img.width
            canvas.height = img.height

            ctx.globalCompositeOperation = "destination-over"
            ctx.fillStyle = values.boardColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(img, 0, 0, img.width, img.height)

            // Yazıları ekle
            texts.forEach(({ text, x, y, maxWidth=700, maxHeight=430 }) => {
                ctx.save()

                ctx.beginPath()
                ctx.rect(x - maxWidth / 2, y - maxHeight / 2, maxWidth, maxHeight)
                ctx.clip()

                // bg
                // ctx.fillStyle = "#F0E68C"; 
                // ctx.fillRect(x - maxWidth / 2, y - maxHeight / 2, maxWidth, maxHeight);


                ctx.translate(x, y)
                ctx.font = `800 60px ${values.fontFamily2}`
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#000"

                wrapText(ctx, text.toUpperCase(), 0, 0, maxWidth, 70, maxHeight);
                ctx.restore()
            })
        }

    }, [values])

    const wrapText = (ctx, text, x, y, maxWidth, lineHeight, maxHeight) => {
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

        // Yazıları dikey olarak ortala
        const totalTextHeight = lines.length * lineHeight;
        const startY = y - totalTextHeight / 2;

        for (let i = 0; i < lines.length; i++) {
            if (startY + i * lineHeight <= maxHeight / 2) {
                ctx.fillText(lines[i], x, startY + i * lineHeight);
            } else {
                break; // Yazılar yüksekliği aştığında çık
            }
        }
    };

    return (
        <canvas ref={canvasRef} className="w-full" />
    )
}
