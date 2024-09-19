from .dev import *  # NOQA


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.debug("loading settings staging.py")


ALLOWED_HOSTS = ["api.heatedmaps.com"]

# Override your settings for the staging environment here.
