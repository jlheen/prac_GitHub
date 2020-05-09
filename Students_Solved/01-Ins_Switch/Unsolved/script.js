// intro to SWITCH functions
// not in Python
// why would we use these -- often found in
// networking scenarios
// further reading: https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript 

function chooseFriend(friend) {
    switch(friend) {
        case "Mickey":
            console.log("I am a famous mouse");
            break;
            // using break -- once the switch statement is satisfied, want it to end functioning (aka "break")
        case "Donald":
            console.log("I am a famous duck");
            break;
        case "Goofy":
            console.log("I am a famous dog");
            break;
        default:
            console.log("Did you forget to choose a friend?")
    }
}

chooseFriend("Mickey");

// if you do not use the break statement, it will find the next case and run it
// diff between switch & if/else

// you can combine cases together
// example, the following (commented out), will print the "I am a famous duck"
// switch(friend) {
//     case "Mickey":
//     case "Donald":
//         console.log("I am a famous duck");
//         break;



function chooseFriend(friend) {
    var message = ""
    switch(friend) {
        case "Mickey":
            message = "I am a famous mouse"
            break;
            // using break -- once the switch statement is satisfied, want it to end functioning (aka "break")
        case "Donald":
            message = "I am a famous duck"
            break;
        case "Goofy":
            message = "I am a famous dog"
            break;
        default:
            message = "Did you forget to choose a friend?"
    }
}