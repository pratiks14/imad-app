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

var nameInput = document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
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
                for(var i=0;i<names.length;i++)
                {
                    list+= '<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list;
            } 
        }
    };
    //make request to server and send the name
    //capture the list of name and render it 
    var names=['name1','name2','name3'];
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list+= '<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
    request.open('GET','http://pratik1rn13cs064.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
};    
