  function clipboard() {
      const snippets = document.querySelectorAll("pre");
      snippets.forEach(element => {
      const button = document.createElement("button");
      button.innerHTML = "Copy to clipboard";
      element.parentElement.appendChild(button);

      button.addEventListener ("click", function() {
          //The following regex removes all the comments from the snippet
          const text = element.textContent.replace(/\/\*(.|[\r\n])*?\*\//g, '').replace(/\/\/.*/gm, '');
          // Apparently you can't copy a variable to clipboard so you need to create text input element,
          // give it a value, copy it and then remove it from DOM.
          const textArea = document.createElement("textarea");
          textArea.value = text.trim();
          document.body.appendChild(textArea);
          console.log(textArea.innerText);
          textArea.select();
          document.execCommand("Copy");
          document.body.removeChild(textArea);
        });
      });
    };
