const socket = io()


document.getElementById('btnNewMessage')?.addEventListener('click', ev => {
    if (inputAlias.value && inputMensaje.value) {
        const message = {
            alias: inputAlias.value,
            message: inputMensaje.value,
        }
        socket.emit('newMessage', message)
    }
})

document.getElementById('btnDeleteMsg')?.addEventListener('click', () => {
    socket.emit('deleteMessages')
})

const messagesTemplate = `
{{#if hasMessages}}
<ul>
    {{#each mensajes}}
    <li>{{this.alias}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
no hay mensajes
{{/if}}`


const makeMessagesHtml = Handlebars.compile(messagesTemplate)

socket.on('mensajes', messages => {
    const messagesDiv = document.getElementById('messages')
    if (messagesDiv) {
        messagesDiv.innerHTML = makeMessagesHtml({
            hasMessages: messages.length > 0,
            messages
        })
    }
})