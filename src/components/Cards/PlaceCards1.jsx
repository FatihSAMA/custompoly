import { useRef, useEffect } from "react"

export default function PlaceCards1({ values }) {

    const texts = [
        {
            text: values.brownText1,
            x: 550,
            y: 590,
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
        <div className="w-full">
            <canvas ref={canvasRef} className="w-full" />
        </div>
    )
}
