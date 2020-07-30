from django.contrib import admin
import core.models as cor
admin.site.site_header = 'CompSciSearch Administration'
# Register your models here.

class RankedLinkAdmin(admin.ModelAdmin):
        list_display = ('link', 'up', 'down')


admin.site.register(cor.RankedLink, RankedLinkAdmin)
