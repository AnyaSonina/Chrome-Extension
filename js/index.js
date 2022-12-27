let myLeads = [];
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

const uniqueId = (length=16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
    

function render(leads) {
    let listItems = ""
 
    for(let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a class="link" target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
            <button class="delete_tab">Delete</button>       
            <button class="copy" id="${uniqueId()}"><img src="/files.png" height="20px"></button>
        </li>
    `
    }
    
   
    ulEl.innerHTML = listItems
    let deleteTabs = document.getElementsByClassName("delete_tab")
    let copyBtns = document.getElementsByClassName("copy")    

    
       
    function DeleteOrCopy(leads) {
        
        for(let i = 0; i < leads.length; i++) {
            deleteTabs[i].addEventListener("click", function() {
                let index = leads.indexOf(leads[i])
                leads.splice(index, 1)
                localStorage.setItem("myLeads", JSON.stringify(leads))
                render(leads)
            })
                        
            copyBtns[i].addEventListener("click", function(event) {
                if(event.target.id === copyBtns[i].id) 
                navigator.clipboard.writeText(leads[i])
                copyBtns[i].innerHTML = `<img src="/check.png" height="20px">`
            })
           
           
            
        }
    }
    DeleteOrCopy(myLeads)    
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    if(inputEl.value)
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  
})


 


