pipeline {
    agent any
    
    tools {
        maven 'Maven'
        nodejs 'NodeJS'
    }
    
    environment {
        DOCKER_IMAGE = 'revtickets-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Saikumarsiruvati/RevTicket.git'
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('revtickets-backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                bat 'docker-compose build'
            }
        }
        
        stage('Run Tests') {
            steps {
                dir('revtickets-backend') {
                    bat 'mvn test'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}
