export default function Success(){
    return(
        <div className="flex justify-center items-center gap-2 max-w-[600px] min-h-[600px] mb-8 mx-auto mt-12 rounded-md p-8 bg-foreground text-green-500 drop-shadow-box text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 48 48">
                <defs>
                    <mask id="ipTSuccess0">
                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                            <path fill="#555" d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"></path>
                            <path d="m17 24l5 5l10-10"></path>
                        </g>
                    </mask>
                </defs>
                <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTSuccess0)"></path>
            </svg>
            Form Sent Successfully
        </div>
    )
}