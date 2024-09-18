# service variables
variable "NAMESPACE" {
  description = "NAMESPACE for resource names"
  default     = "heatedmaps"
  type        = string
}

# variable "domain_name" {
#   description = "Api domain name"
#   default = "api.openpdfai.com"
#   type        = string
# }

variable "SERVICE_NAME" {
  description = "A Docker image-compatible name for the service"
  type        = string
}

variable "ENVIRONMENT" {
  description = "ENVIRONMENT for deployment (like dev or staging)"
  default     = "production"
  type        = string
}

variable "DJANGO_SETTINGS_MODULE" {
  description = "The settings file for production"
  default     = "production"
  type        = string
}

variable "CPU_UNITS" {
  description = "Amount of CPU units for a single ECS task"
  default     = 512
  type        = number
}

variable "MEMORY" {
  description = "Amount of memory in MB for a single ECS task"
  default     = 2048 
  type        = number
}

# aws credentials
variable "AWS_ACCESS_KEY_ID" {
  description = "AWS console access key"
  type        = string
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS console secret access key"
  type        = string
}

variable "REGION" {
  description = "AWS region"
  default     = "us-east-1"
  type        = string
}

# # network variables
# variable "tld_zone_id" {
#   description = "Top level domain hosted zone ID"
#   type        = string
# }

variable "VPC_CIDR_BLOCK" {
  description = "CIDR block for the VPC network"
  default     = "10.1.0.0/16"
  type        = string
}

variable "AZ_COUNT" {
  description = "Describes how many availability zones are used"
  default     = 2
  type        = number
}

# ecs variables
variable "ECS_TASK_DESIRED_COUNT" {
  description = "How many ECS tasks should run in parallel"
  default     = 1
  type        = number
}

variable "ECS_TASK_MIN_COUNT" {
  description = "How many ECS tasks should minimally run in parallel"
  default     = 1
  type        = number
}

variable "ECS_TESK_MAX_COUNT" {
  description = "How many ECS tasks should maximally run in parallel"
  default     = 3
  type        = number
}

variable "ECS_TASK_DEPLOYMENT_MINIMUM_HEALTHY_PERCENT" {
  description = "How many percent of a service must be running to still execute a safe deployment"
  default     = 50
  type        = number
}

variable "ECS_TASK_DEPLOYMENT_MAXIMUM_PERCENT" {
  description = "How many additional tasks are allowed to run (in percent) while a deployment is executed"
  default     = 100
  type        = number
}

variable "CONTAINER_PORT" {
  description = "Port of the container"
  type        = number
  default     = 8000
}

# ecr
variable "ECR_FORCE_DELETE" {
  description = "Forces deletion of Docker images before resource is destroyed"
  default     = true
  type        = bool
}

# variable "hash" {
#   description = "Task hash that simulates a unique version for every new deployment of the ECS Task"
#   type        = string
# }

# alb
variable "HEALTHCHECK_ENDPOINT" {
  description = "Endpoint for ALB healthcheck"
  type        = string
  default     = "/api/healthcheck/"
}

variable "HEALTHCHECK_MATCHER" {
  description = "HTTP status code matcher for healthcheck"
  type        = string
  default     = "200"
}

# cloudwatch
variable "RETENTION_IN_DAYS" {
  description = "Retention period for Cloudwatch logs"
  default     = 7
  type        = number
}

# # service level
# # backend
# variable "ENVIRONMENT" {}
# variable "PROJECT_NAME" {}
# variable "SERVER_HOST" {}
# variable "DOMAIN" {}
# variable "BACKEND_CORS_ORIGINS" {}
# variable "FIRST_SUPERUSER" {}
# variable "FIRST_SUPERUSER_PASSWORD" {}
# variable "EMAILS_FROM_EMAIL" {}
# variable "USERS_OPEN_REGISTRATION" {}
variable "DJANGO_SECRET_KEY" {}

# # postgres
variable "POSTGRES_DB" {}
variable "POSTGRES_PASSWORD" {}
variable "POSTGRES_USER" {}

# # google
variable "GOOGLE_CLIENT_ID" {}

# # aws
# variable "ACCESS_KEY_ID" {}
# variable "SECRET_ACCESS_KEY" {}
# variable "AWS_BUCKET_NAME" {}
# variable "AWS_REGION" {}

# # openai
# variable "OPENAI_API_KEY" {}
# variable "OPENAI_ORGANIZATION" {}

# # qdrant
# variable "COLLECTION_NAME" {}
# variable "COLLECTION_SIZE" {}
# variable "QDRANT_API_KEY" {}
# variable "QDRANT_HOST" {}
# variable "QDRANT_PORT" {}
# variable "QDRANT_URL" {}

# # smtp
# variable "MAILTRAP_API_KEY" {}
# variable "SMTP_HOST" {}
# variable "SMTP_PASSWORD" {}
# variable "SMTP_PORT" {}
# variable "SMTP_TLS" {}
# variable "SMTP_USER" {}

# # stripe
# variable "STRIPE_ENDPOINT_SECRET" {}
# variable "STRIPE_PUBLISHABLE_KEY" {}
# variable "STRIPE_SECRET_KEY" {}

# # cron-job
# variable "CRON_JOB_SECRET_KEY" {}
# variable "DOCUMENT_PORECESSOR_SECRETE_KEY" {}