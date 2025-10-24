const Circle = ({w, h, percent, total}) => {
    const radius = (w / 2) - 10;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = (1 - percent) * dashArray;
    
    return ( 
        <div className="flex justify-center items-center w-full">
            <svg width={w} height={h}>
                <circle 
                    cx={w / 2}
                    cy={h / 2} 
                    r={radius} 
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
                    style={{
                        transition: 'stroke-dashoffset 0.5s ease-in-out'
                    }}
                />
                <text 
                    x="50%"
                    y="50%"
                    fill="#28402E" 
                    dominantBaseline="middle"
                    textAnchor="middle" 
                    fontSize={window.innerWidth < 640 ? 20 : 30} 
                    fontWeight={700}
                >{Math.round(percent * total)}/{total}</text>
            </svg>
        </div>
    );
}

export default Circle;