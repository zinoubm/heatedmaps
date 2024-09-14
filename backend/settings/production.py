from .staging import *  # NOQA

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.info("loading settings production.py")

DEBUG = False
