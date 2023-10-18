const socket = io()


document.getElementById('btnNuevoMsg')?.addEventListener('click', ev => {
    if (inputAlias.value && inputMensaje.value) {
        const message = {
            alias: inputAlias.value,
            message: inputMensaje.value,
        }
        socket.emit('nuevoMensaje', message)
    }
})

document.getElementById('btnBorrarMsg')?.addEventListener('click', () => {
    socket.emit('borrarMensajes')
})

const messagesTemplate = `
{{#if hayMensajes}}
<ul>
    {{#each mensajes}}
    <li>{{this.alias}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
no hay mensajes
{{/if}}`


const makeMensajesHtml = Handlebars.compile(messagesTemplate)

socket.on('mensajes', mensajes => {
    const messagesDiv = document.getElementById('messages')
    if (messagesDiv) {
        messagesDiv.innerHTML = makeMensajesHtml({
            hayMensajes: mensajes.length > 0,
            mensajes
        })
    }
})