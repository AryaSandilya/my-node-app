
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
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'

                // Stop any previously running instance
                sh '''
                    echo "Stopping old instance (if any)..."
                    pkill -f "node server.js" || true
                    sleep 1
                '''

                // Start the server in the background
                sh '''
                    nohup node server.js > app.log 2>&1 &
                    echo $! > app.pid
                    sleep 2
                    echo "Server started with PID: $(cat app.pid)"
                '''
            }
        }

        stage('Verify') {
            steps {
                echo '✅ Verifying deployment...'
                sh '''
                    sleep 1
                    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${APP_PORT})
                    echo "HTTP Status: $STATUS"
                    if [ "$STATUS" = "200" ]; then
                        echo "✅ App is live at http://localhost:${APP_PORT}"
                    else
                        echo "❌ App returned status $STATUS"
                        exit 1
                    fi
                '''
            }
        }

    }

    post {
        success {
            echo """
====================================
 ✅ BUILD SUCCEEDED
 App live at: http://localhost:${APP_PORT}
 Open your browser to see changes!
====================================
"""
        }
        failure {
            echo """
====================================
 ❌ BUILD FAILED
 Check the logs above for errors.
====================================
"""
            // Tail the app log for debugging
            sh 'cat app.log || true'
        }
        always {
            echo '📋 Pipeline finished.'
        }
    }
}