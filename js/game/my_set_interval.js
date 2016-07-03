function mySetInterval(callback, delay)
{
    var now;
    var delta;
    var interval;
    var then = new Date().getTime();

    return (function loop(time)
    {
        var animationFrame = requestAnimationFrame(loop);

        interval = delay;
        now = new Date().getTime();
        delta = now - then;

        if (delta > interval)
        {
            then = now - (delta % interval);
            callback(animationFrame);
        }
    }());
}
