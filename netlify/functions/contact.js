exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const data = JSON.parse(event.body);
        
        // Here you can add your email sending logic or other processing
        
        // For now, we'll just log the data
        console.log("Form submission received:", data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Form submitted successfully" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to process form submission" })
        };
    }
}; 