resource "aws_security_group" "ecs_container_instance" {
  name        = "${var.NAMESPACE}_ecs_task_security_group_${var.ENVIRONMENT}"
  description = "Security group for ECS task running on Fargate"
  vpc_id      = aws_vpc.default.id

  ingress {
    description     = "Allow ingress traffic from ALB on HTTP only"
    from_port       = var.CONTAINER_PORT
    to_port         = var.CONTAINER_PORT
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "Allow all egress traffic"
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name     = "${var.NAMESPACE}_ecs_task_security_group_${var.ENVIRONMENT}"
  }
}

resource "aws_security_group" "rds_postgres" {
  vpc_id = aws_vpc.default.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name     = "${var.NAMESPACE}_rds_postgres_security_group_${var.ENVIRONMENT}"
 }
}

resource "aws_security_group" "alb" {
  name        = "${var.NAMESPACE}_alb_security_group_${var.ENVIRONMENT}"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.default.id

  ingress {
    description     = "Allow incoming https trafic"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all egress traffic"
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name     = "${var.NAMESPACE}_alb_security_group_${var.ENVIRONMENT}"
  }
}

resource "aws_security_group" "batch" {
  name = "${var.NAMESPACE}_batch_${var.ENVIRONMENT}"
  vpc_id = aws_vpc.default.id
  description = "Security Groupe for Batch"
  
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  tags = {
    Name     = "${var.NAMESPACE}_batch_${var.ENVIRONMENT}"
  }
}



# resource "aws_iam_role" "aws_ecs_task_execution_role" {
#   name = "my-project-ecs-task-execution-role"

#   assume_role_policy = <<EOF
#                         {
#                           "Version": "2012-10-17",
#                           "Statement": [
#                             {
#                               "Sid": "",
#                               "Effect": "Allow",
#                               "Principal": {
#                                 "Service": "ecs-tasks.amazonaws.com"
#                               },
#                               "Action": "sts:AssumeRole"
#                             }
#                           ]
#                         }
#                         EOF
# }