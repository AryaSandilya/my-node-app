pipeline {
    agent any

    environment {
        APP_PORT = '3000'
        APP_NAME = 'my-node-app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'

                // Kill any existing node process on port 3000
                bat '''
                    FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :%APP_PORT% ^| findstr LISTENING') DO (
                        echo Killing PID %%P on port %APP_PORT%
                        taskkill /PID %%P /F
                    )
                    exit /b 0
                '''

                // Start server in background using Windows START command
                bat '''
                    START /B node server.js > app.log 2>&1
                    ping 127.0.0.1 -n 3 > nul
                    echo Server started!
                '''
            }
        }

        stage('Verify') {
            steps {
                echo '✅ Verifying deployment...'
                bat '''
                    ping 127.0.0.1 -n 3 > nul
                    curl -s -o nul -w "HTTP Status: %%{http_code}" http://localhost:%APP_PORT%
                '''
            }
        }

    }

    post {
        success {
            echo """
====================================
 BUILD SUCCEEDED
 App live at: http://localhost:${APP_PORT}
 Open your browser to see changes!
====================================
"""
        }
        failure {
            echo """
====================================
 BUILD FAILED
 Check the logs above for errors.
====================================
"""
            bat 'type app.log || exit /b 0'
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}