
export function sendNotification(msg){
    Notification.requestPermission().then(Permissions=> {
        if (Permissions === "granted"){
            const notification = new Notification('Alert!',{
                body: msg,
                icon: 'background.jpg',
                tag: 'unique_id'
            })

            notification.onclick = () => {
                console.log('notification clicked')
            }
        }
        else {
            console.log('Notification permission denied')
        }
    })
}
