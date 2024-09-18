# vpc
resource "aws_vpc" "default" {
  cidr_block           = var.VPC_CIDR_BLOCK
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.NAMESPACE}_vpc_${var.ENVIRONMENT}"
  }
}

resource "aws_internet_gateway" "default" {
  vpc_id = aws_vpc.default.id

  tags = {
    Name = "${var.NAMESPACE}_internet_way_${var.ENVIRONMENT}"
  }
}