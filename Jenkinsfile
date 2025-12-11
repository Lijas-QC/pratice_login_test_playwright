pipeline {
    agent any
    tools {
        nodejs 'node18'
    }
    environment {
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\ms-playwright"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lijas-QC/pratice_login_test_playwright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=allure-playwright'
            }
        }
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }
        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', fingerprint: true, allowEmptyArchive: true
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed! Please check the console output for details.'
            // Email notification commented out - configure SMTP in Jenkins if needed
            // mail to: 'lijas.qctest@gmail.com',
            //      subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //      body: "Please check Jenkins for details: ${env.BUILD_URL}"
        }
    }
}
