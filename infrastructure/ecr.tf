resource "aws_ecr_repository" "ecr" {
  name  = "${lower(var.NAMESPACE)}/${var.SERVICE_NAME}"
  force_delete = var.ECR_FORCE_DELETE

  image_scanning_configuration {
    scan_on_push = true
  }
}

output "ecr_repository_url" {
  value = aws_ecr_repository.ecr.repository_url
}