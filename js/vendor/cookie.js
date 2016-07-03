function setCookie(name, value, options)
{
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires)
    {
        var date = new Date();
        date.setTime(date.getTime() + expires * 1000);
        expires = options.expires = date;
    }
    if (expires && expires.toUTCString)
    {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options)
    {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true)
        {
          updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function getCookie(name)
{
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0)
    {
        offset = cookie.indexOf(search);
        if (offset != -1)
        {
            offset += search.length;
            end = cookie.indexOf(";", offset);
            if (end == -1)
            {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}
