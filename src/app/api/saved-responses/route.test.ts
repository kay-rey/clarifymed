import axios from 'axios';

async function testSavedResponses() {
    try {
        // Test POST request
        const testData = {
            userId: "test-user-123",
            question: "What are the symptoms of diabetes?",
            response: "Common symptoms include increased thirst, frequent urination...",
            metadata: {
                tags: ["diabetes", "symptoms"],
                category: "endocrinology"
            }
        };

        console.log('Sending POST request...');
        const postResponse = await axios.post(
            'http://localhost:3000/api/saved-responses',
            testData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('POST Response:', postResponse.data);

        // Test GET request
        console.log('Sending GET request...');
        const getResponse = await axios.get(
            `http://localhost:3000/api/saved-responses?userId=${testData.userId}`
        );
        console.log('GET Response:', getResponse.data);

    } catch (error: any) {
        console.error('Test failed:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
    }
}

testSavedResponses();