const sgMail=require('@sendgrid/mail');
const sendgridAPIKey='SG.p114efkbQpmGnSRmyyUpkA.QyWo4yGFvYIyy_q2o2-K571fCG4Y7pofx8cexzTSyjg'

sgMail.setApiKey(sendgridAPIKey);

// sgMail.send({
//     to:['seguteja1997@gmail.com','svssteja@gmail.com','svssteja1997@gmail.com'],
//     from:'sivateja@skystop.tech',
//     subject:'This is my first test case',
//     text:'I hope this one delivered it to u',
//     html: '<p>Hello HTML world!</p>'
// }).then(()=>{
//     console.log("Email sent successfully")
// })

const sendWelcomeEmail=(email,name)=>{
sgMail.send({
    to:email,
    from:'sivateja@skystop.tech',
    subject:'Thanks for Joining in BetMaster',
    text:`Welcome to BetMaster ${name}.Let me know how you get along with the app`
}).then(()=>{
    console.log("Registration Email sent successfully")
})
}

const cancelEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'sivateja@skystop.tech',
        subject:'Cancellation policy in BetMaster',
        text:`Hello ${name} .I am sorry to tell you that u are not an live user for us.Is there any challenges are reasons to become an ex-user for our committemnt`
    }).then(()=>{
        console.log("Cancellation mail sent successfully")
    })
}
module.exports={
    sendWelcomeEmail,
    cancelEmail
}


