export function mensajeCompraExitosa(order) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compra Exitosa</title>
</head>

<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="text-align: center;">Compra Exitosa</h1>
        <p>¡Gracias por tu compra! Queremos confirmarte que tu orden de compra con el siguiente detalle ha sido procesada
            exitosamente:</p>

        <div style="background-color: #f8f8f8; border: 1px solid #ddd; padding: 10px; margin-top: 10px;">
            <p><strong>ID de Orden:</strong> ${order._id}</p>
            <p><strong>Código:</strong> ${order.code}</p>
            <p><strong>Fecha y Hora de Compra:</strong> ${order.purchase_dateTime}</p>
            <p><strong>Monto Total:</strong> $${order.amount}</p>
        </div>

        <p>Gracias por elegir nuestros servicios. Si tienes alguna pregunta o inquietud, no dudes en contactarnos.</p>

        <p>¡Que tengas un excelente día!</p>
    </div>
</body>

</html>

`}
export const mensajeProductoEliminado = ``