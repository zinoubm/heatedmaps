# iam
data "aws_iam_policy_document" "task_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "${var.NAMESPACE}_ecs_execution_role_${var.ENVIRONMENT}"
  assume_role_policy = data.aws_iam_policy_document.task_assume_role_policy.json
}

resource "aws_iam_role" "ecs_task_iam_role" {
  name               = "${var.NAMESPACE}_ecs_task_iam_role_${var.ENVIRONMENT}"
  assume_role_policy = data.aws_iam_policy_document.task_assume_role_policy.json
}

data "aws_iam_policy_document" "batch_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["batch.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "aws_batch_service_role" {
  name = "${var.NAMESPACE}_batch_service_role_${var.ENVIRONMENT}"
  assume_role_policy = data.aws_iam_policy_document.batch_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "aws_batch_service_role" {
  role       = aws_iam_role.aws_batch_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole"
}

# cluster
resource "aws_ecs_cluster" "default" {
  name = "${var.NAMESPACE}_ecs_cluster_${var.ENVIRONMENT}"

  tags = {
    Name     = "${var.NAMESPACE}_ecs_cluster_${var.ENVIRONMENT}"
  }
}

# service
resource "aws_ecs_service" "service" {
  name                               = "${var.NAMESPACE}_ecs_service_${var.ENVIRONMENT}"
  cluster                            = aws_ecs_cluster.default.id
  task_definition                    = aws_ecs_task_definition.default.arn
  desired_count                      = var.ECS_TASK_DESIRED_COUNT
  deployment_minimum_healthy_percent = var.ECS_TASK_DEPLOYMENT_MINIMUM_HEALTHY_PERCENT
  deployment_maximum_percent         = var.ECS_TASK_DEPLOYMENT_MAXIMUM_PERCENT
  launch_type                        = "FARGATE"

  load_balancer {
    target_group_arn = aws_alb_target_group.service_target_group.arn
    container_name   = var.SERVICE_NAME
    container_port   = var.CONTAINER_PORT
  }

  network_configuration {
    security_groups  = [aws_security_group.ecs_container_instance.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }
}

# task definition
resource "aws_ecs_task_definition" "default" {
  family                   = "${var.NAMESPACE}_ecs_task_definition_${var.ENVIRONMENT}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                      = var.CPU_UNITS
  memory                   = var.MEMORY
  
  container_definitions = jsonencode([
    {
      name         = var.SERVICE_NAME
      image        = "${aws_ecr_repository.ecr.repository_url}:latest"
      cpu          = var.CPU_UNITS
      memory       = var.MEMORY
      essential    = true
      environment = [
                    # backend
                    {
                      name  = "ENVIRONMENT"
                      value = var.ENVIRONMENT
                    },
                    {
                      name = "DJANGO_SETTINGS_MODULE"
                      value = var.DJANGO_SETTINGS_MODULE
                    },
                    {
                      name  = "SECRET_KEY"
                      value = var.DJANGO_SECRET_KEY
                    },

                    # postgres
                    {
                      name  = "POSTGRES_DB"
                      value = var.POSTGRES_DB
                    },
                    {
                      name  = "POSTGRES_PASSWORD"
                      value = var.POSTGRES_PASSWORD
                    },
                    {
                      name  = "POSTGRES_USER"
                      value = var.POSTGRES_USER
                    },
                    {
                      name  = "POSTGRES_SERVER"
                      value = aws_db_instance.heatedmaps_db.endpoint
                    },

                    # google
                    {
                      name  = "GOOGLE_CLIENT_ID"
                      value = var.GOOGLE_CLIENT_ID
                    },

                    # # aws
                    # {
                    #   name  = "ACCESS_KEY_ID"
                    #   value = var.ACCESS_KEY_ID
                    # },
                    # {
                    #   name  = "SECRET_ACCESS_KEY"
                    #   value = var.SECRET_ACCESS_KEY
                    # },
                    # {
                    #   name  = "AWS_BUCKET_NAME"
                    #   value = var.AWS_BUCKET_NAME
                    # },
                    # {
                    #   name  = "AWS_REGION"
                    #   value = var.AWS_REGION
                    # },

                    # # openai
                    # {
                    #   name  = "OPENAI_API_KEY"
                    #   value = var.OPENAI_API_KEY
                    # },
                    # {
                    #   name  = "OPENAI_ORGANIZATION"
                    #   value = var.OPENAI_ORGANIZATION
                    # },
                    
                    # # qdrant
                    # {
                    #   name  = "COLLECTION_NAME"
                    #   value = var.COLLECTION_NAME
                    # },
                    # {
                    #   name  = "COLLECTION_SIZE"
                    #   value = var.COLLECTION_SIZE
                    # },
                    # {
                    #   name  = "QDRANT_API_KEY"
                    #   value = var.QDRANT_API_KEY
                    # },
                    # {
                    #   name  = "QDRANT_HOST"
                    #   value = var.QDRANT_HOST
                    # },
                    # {
                    #   name  = "QDRANT_PORT"
                    #   value = var.QDRANT_PORT
                    # },
                    # {
                    #   name  = "QDRANT_URL"
                    #   value = var.QDRANT_URL
                    # },

                    # # smtp
                    # {
                    #   name  = "MAILTRAP_API_KEY"
                    #   value = var.MAILTRAP_API_KEY
                    # },
                    # {
                    #   name  = "SMTP_HOST"
                    #   value = var.SMTP_HOST
                    # },
                    # {
                    #   name  = "SMTP_PASSWORD"
                    #   value = var.SMTP_PASSWORD
                    # },
                    # {
                    #   name  = "SMTP_PORT"
                    #   value = var.SMTP_PORT
                    # },
                    # {
                    #   name  = "SMTP_TLS"
                    #   value = var.SMTP_TLS
                    # },
                    # {
                    #   name  = "SMTP_USER"
                    #   value = var.SMTP_USER
                    # },

                    # # stripe
                    # {
                    #   name  = "STRIPE_ENDPOINT_SECRET"
                    #   value = var.STRIPE_ENDPOINT_SECRET
                    # },
                    # {
                    #   name  = "STRIPE_PUBLISHABLE_KEY"
                    #   value = var.STRIPE_PUBLISHABLE_KEY
                    # },
                    # {
                    #   name  = "STRIPE_SECRET_KEY"
                    #   value = var.STRIPE_SECRET_KEY
                    # },
                    # # services secrets
                    # {
                    #   name  = "CRON_JOB_SECRET_KEY"
                    #   value = var.CRON_JOB_SECRET_KEY
                    # },
                    # {
                    #   name  = "DOCUMENT_PORECESSOR_SECRETE_KEY"
                    #   value = var.DOCUMENT_PORECESSOR_SECRETE_KEY
                    # },
                    # # batch
                    # {
                    #   name  = "AWS_BATCH_JOB_QUEUE_ARN"
                    #   value = aws_batch_job_queue.batch.arn
                    # },
                    # {
                    #   name  = "AWS_BATCH_JOB_DEFINITION_ARN"
                    #   value = aws_batch_job_definition.batch.arn
                    # },
                    ]


      portMappings = [
        {
          containerPort = var.CONTAINER_PORT
          hostPort      = var.CONTAINER_PORT
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options   = {
          "awslogs-group"         = aws_cloudwatch_log_group.log_group.name
          "awslogs-region"        = var.REGION
          "awslogs-stream-prefix" = "${var.SERVICE_NAME}-log-stream-${var.ENVIRONMENT}"
        }
      }
    }
  ])
}