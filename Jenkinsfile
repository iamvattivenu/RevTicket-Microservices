pipeline {
    agent any
    
    tools {
        maven 'Maven'
        jdk 'JDK17'
    }
    
    environment {
        DOCKER_REGISTRY = 'iamvattivenu'
        GIT_REPO = 'https://github.com/iamvattivenu/RevTicket-Microservices.git'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }
        
        stage('Build Microservices') {
            steps {
                script {
                    def services = [
                        'api-gateway',
                        'auth-service',
                        'event-service',
                        'booking-service',
                        'notification-service',
                        'payment-service',
                        'review-service'
                    ]
                    
                    services.each { service ->
                        dir("revtickets-microservices/${service}") {
                            bat "mvn clean package -DskipTests"
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    bat "docker-compose build"
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                                     usernameVariable: 'DOCKER_USER', 
                                                     passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker-compose push"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    bat "docker-compose down"
                    bat "docker-compose up -d"
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sleep(time: 60, unit: 'SECONDS')
                    bat "curl -f http://localhost:8080/actuator/health || exit 1"
                }
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
