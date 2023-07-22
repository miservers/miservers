mod_my_check.la: mod_my_check.slo
	$(SH_LINK) -rpath $(libexecdir) -module -avoid-version  mod_my_check.lo
DISTCLEAN_TARGETS = modules.mk
shared =  mod_my_check.la
