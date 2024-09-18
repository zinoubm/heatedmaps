resource "aws_cloudwatch_log_group" "log_group" {
  name              = "/${lower(var.NAMESPACE)}/ecs/${var.SERVICE_NAME}"
  retention_in_days = var.RETENTION_IN_DAYS

}