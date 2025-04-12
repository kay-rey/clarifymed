import * as dotenv from 'dotenv'
import path from 'path'

function debugEnv() {
    const rootDir = process.cwd()
    console.log('🔍 Environment Debug Information')
    console.log('--------------------------------')
    console.log('Project root:', rootDir)
    
    // Check for environment files
    const envFiles = ['.env', '.env.local', '.env.development', '.env.development.local']
    console.log('\n📁 Environment Files:')
    envFiles.forEach(file => {
        const filePath = path.join(rootDir, file)
        try {
            const result = dotenv.config({ path: filePath })
            console.log(`- ${file}: ${result.parsed ? '✅ Found and loaded' : '❌ Not found'}`)
        } catch (error) {
            console.log(`- ${file}: ❌ Error loading`)
        }
    })

    // Check environment variables
    console.log('\n🔑 Environment Variables:')
    const requiredVars = ['MONGODB_URI', 'MONGODB_DB']
    requiredVars.forEach(varName => {
        const value = process.env[varName]
        if (value) {
            const maskedValue = varName === 'MONGODB_URI' 
                ? value.replace(/\/\/.*@/, '//***:***@')
                : value
            console.log(`- ${varName}: ✅ Present (${maskedValue})`)
        } else {
            console.log(`- ${varName}: ❌ Missing`)
        }
    })
}

debugEnv()