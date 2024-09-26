import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://scrape-summarize-api.azurewebsites.net/articles/today")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
  }, [])

  const getAuthors = (a) => {
    if(a.length < 3) {
      return a.join(", ");
    }
    else {
      return a.slice(0, 3).join(", ") + ", et al.";
    }
  }

  const getSubjectBadge = (s) => {
    let subject = s.find(x => x != "Artificial Intelligence (cs.AI)") ?? s[0];
    const abbreviation = subject.split(".")[1].split(')')[0];
    const display = getSubjectDisplayName(abbreviation);
    return(
      <div class={"badge " + abbreviation.toLowerCase()}>
        {getSubjectIcon(abbreviation)}
        {display}
      </div>
    )
  }

  const getSubjectIcon = (s) => {
    if(s == "CV") {
      return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "5px", marginTop: "1px"}}>
          <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
        </svg>

      )
    }
    else if(s == "CL") {
      return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "5px", marginTop: "1px"}}>
          <path fill-rule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clip-rule="evenodd"/>
        </svg>
      )
    }
    else if(s == "LG") {
      return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "5px", marginTop: "1px"}}>
          <path d="M11 21V2.352A3.451 3.451 0 0 0 9.5 2a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 4.04 8.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.017 4.017 0 0 0 2.3 12.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 2 14c.003.24.027.48.072.716a4 4 0 0 0 .235.832c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.285.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 11 21Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 14.5 2a3.451 3.451 0 0 0-1.5.352V21a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 20 17.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z"/>
        </svg>
      )
    }
    else if (s == "AI") {
      return (
        <svg width="16" height="16" fill="currentColor" style={{marginRight: "5px", marginTop: "1px"}} viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
          <path d="m32 224h32v192h-32a31.96166 31.96166 0 0 1 -32-32v-128a31.96166 31.96166 0 0 1 32-32zm512-48v272a64.06328 64.06328 0 0 1 -64 64h-320a64.06328 64.06328 0 0 1 -64-64v-272a79.974 79.974 0 0 1 80-80h112v-64a32 32 0 0 1 64 0v64h112a79.974 79.974 0 0 1 80 80zm-280 80a40 40 0 1 0 -40 40 39.997 39.997 0 0 0 40-40zm-8 128h-64v32h64zm96 0h-64v32h64zm104-128a40 40 0 1 0 -40 40 39.997 39.997 0 0 0 40-40zm-8 128h-64v32h64zm192-128v128a31.96166 31.96166 0 0 1 -32 32h-32v-192h32a31.96166 31.96166 0 0 1 32 32z"/>
        </svg>
      )
    }
    else {
      return (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "5px", marginTop: "1px"}}>
        <path fill-rule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clip-rule="evenodd"/>
      </svg>
      )
    }
  }

  const getSubjectDisplayName = (s) => {
    if(s == "CV") {
      return "Computer Vision"
    }
    else if(s == "CL") {
      return "NLP"
    }
    else if(s == "LG") {
      return "Machine Learning"
    }
    else if (s == "AI") {
      return "Artificial Intelligence"
    }
    else {
      return "Other"
    }
  }

  return (
    <>
    {data.length == 0 &&
      <main class="container" aria-busy={true} style={{width: '123px'}}>
        Loading...
      </main>
    }
    <main class="container">
      <div class="grid">
        {data.map(d => (
          <article style={{margin: "5px"}}>
            <h5><a href={d.link} target="_blank">{d.title}</a></h5>
            <p><b>{getAuthors(d.authors)}</b></p>
            {getSubjectBadge(d.subject)}
            <p>{d.summary}</p>
          </article>
        ))}
      </div>
    </main>
    </>
  )
  
}

export default App
