namespace Logotype {
    const element: HTMLElement | null = document.getElementById('canvas');

    if (element) {
        const canvas: HTMLCanvasElement = element as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    
        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = '#f0f0f0';
            ctx.moveTo(40, 10);
            ctx.lineTo(90, 10);
            ctx.lineTo(120, 70);
            ctx.lineTo(10, 70);
            ctx.lineTo(30, 10);
            ctx.fill();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.fillStyle = 'purple';
            ctx.arc(40, 85, 15, 0, 2 * Math.PI);
            ctx.arc(90, 85, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
}
