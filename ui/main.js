//counter code
var button=document.getElementById("button");
//var counter=0

button.onclick=function()
{
    var request=new XMLHttpRequest();//make a request to counter endpoint
     
    request.onreadystatechange = function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                var counter=request.responseText;
                var span=document.getElementById("count");
                span.innerHTML=counter.toString();
            } 
        }
    };
    
    request.open('GET','http://pratik1rn13cs064.imad.hasura-app.io/counter',true);
    request.send(null);
    
};


submit.onclick=function()
{
    var request=new XMLHttpRequest();//make a request to counter endpoint
     
    request.onreadystatechange = function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                var names=request.responseText;
                names=JSON.parse(names);
                var list='';
                for(var i=0;i<names.length();i++)
                {
                    list+= '<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list;
            } 
        }
    };
    var name = document.getElementById('name').value;
    var submit=document.getElementById('submit_btn');
    request.open('GET','http://pratik1rn13cs064.imad.hasura-app.io/submit-name?name='+myname,true);
    request.send(null);
};    
