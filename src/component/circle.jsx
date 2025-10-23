const Circle = ({w, h, percent, total}) => {
    const radius = (w / 2) - 10;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = (1 - percent / 100) * dashArray;
    return ( 
        <div className="flex justify-center items-center w-full">
            <svg width={w} height={h}>
                <circle 
                cx={w / 2}
                cy={h / 2} 
                r={w / 2 - 10} 
                fill="none" 
                stroke="#ddd"
                strokeWidth="10"
                />
                <circle 
                cx={w / 2}
                cy={h / 2} 
                r={radius} 
                fill="none" 
                stroke="#28402E"
                strokeWidth="10"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${w / 2} ${w / 2})`}
                />
                <text 
                x="50%"
                y="50%"
                fill="#28402E" 
                dominantBaseline="middle"
                textAnchor="middle" 
                fontSize={30} 
                fontWeight={700}
                >{percent / 100 * total}/{total}</text>
            </svg>
        </div>
    );
}
 
export default Circle;