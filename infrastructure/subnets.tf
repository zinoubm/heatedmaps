# get availability zones in our region
data "aws_availability_zones" "available" {}

resource "aws_subnet" "public" {
  count                   = var.AZ_COUNT
  cidr_block              = cidrsubnet(var.VPC_CIDR_BLOCK, 8, var.AZ_COUNT + count.index)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  vpc_id                  = aws_vpc.default.id
  map_public_ip_on_launch = true

  tags = {
    Name     = "${var.NAMESPACE}_public_subnet_${count.index}_${var.ENVIRONMENT}"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default.id
  }

  tags = {
    Name     = "${var.NAMESPACE}_public_route_table_${var.ENVIRONMENT}"
  }
}

resource "aws_route_table_association" "public" {
  count          = var.AZ_COUNT
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_main_route_table_association" "public_main" {
  vpc_id         = aws_vpc.default.id
  route_table_id = aws_route_table.public.id
}

resource "aws_subnet" "private" {
  count             = var.AZ_COUNT
  cidr_block        = cidrsubnet(var.VPC_CIDR_BLOCK, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  vpc_id            = aws_vpc.default.id

  tags = {
    Name     = "${var.NAMESPACE}_private_subnet_${count.index}_${var.ENVIRONMENT}"
  }
}