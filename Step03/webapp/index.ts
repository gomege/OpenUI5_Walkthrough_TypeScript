import Button from "sap/m/Button";

// Create a new Button instance
new Button({
    text: "This is a UI5 Button, inviting to be clicked!",
    press: () => {
        alert("At this point, typescript is working! You can now start coding your UI5 application with TypeScript.");
        console.log("At this point, typescript is working! You can now start coding your UI5 application with TypeScript.");
    }
}).placeAt("content");
