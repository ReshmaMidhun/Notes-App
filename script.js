const addButton = document.getElementById('btn-add');
            addButton.addEventListener('click', () => createNote());

            function createNote(noteTitle= 'Note title',noteBody = 'Note Body'){
                const noteElement = document.createElement('div');
                noteElement.classList.add("col-md-3", "col-sm-6", "col-12");
                noteElement.innerHTML = `
                    <div class="card">
                    <div class="card-header">
                        <span class="note-title">${noteTitle}</span>
                        <button class="btn-close float-end" ></button>
                    </div>
                    <div class="card-body note-body">
                        ${noteBody}
                    </div>
                </div>
                `;
                    document.getElementById('notes').appendChild(noteElement);

                    const closeButton = noteElement.querySelector('.btn-close');
                    closeButton.addEventListener('click', function(){
                        noteElement.remove();
                        saveNotes();
                    });

                    const addTitle = noteElement.querySelector('.note-title');
                    addTitle.addEventListener('click', function(){
                        addTitle.setAttribute('contenteditable',true);
                    });

                    addTitle.addEventListener('keydown', function(event){
                        if(event.key === 'Enter'){
                            event.preventDefault();
                            addTitle.removeAttribute('contentEditable');
                            addTitle.blur();
                            saveNotes();
                        }
                    });

                    const addBody = noteElement.querySelector('.note-body');
                    addBody.addEventListener('click', function(){
                        addBody.setAttribute('contenteditable',true);
                    });

                    addBody.addEventListener('blur',function(event){
                        event.preventDefault();
                        addBody.removeAttribute('contentEditable');
                        saveNotes();
                        
                    });
            }
 
            function saveNotes(){
                const notes = [];
                document.querySelectorAll("#notes .card").forEach(card => {
                    const title = card.querySelector('.note-title').innerHTML.trim() ;
                    const body = card.querySelector('.note-body').innerHTML.trim();
                    
                    if (title !== '' || body !== '') { // Save only if at least one has content
                        notes.push({ title, body });
                    }
                });
                localStorage.setItem('myNotes',JSON.stringify(notes));
            }

            window.onload =  () => loadNotes();

            function loadNotes(){
                const savedNotes = JSON.parse(localStorage.getItem('myNotes')) || [];
        savedNotes.forEach(note => createNote(note.title, note.body));
   
            }