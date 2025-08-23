
from django import forms

class For_Mixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.apply_mixin()
        
    default_classes = "py-2.5 px-3 mb-5 text-gray-600 font-semibold text-lg bg-[#f5f5f5] rounded-xl shadow-neu-inner  border-0 outline-none"

    def apply_mixin(self):
        for field_name, field in self.fields.items():
            if isinstance(field.widget, forms.TextInput):
                field.widget.attrs.update({
                    'class': f'{self.default_classes} w-full',
                    "placeholder": f"Enter {field.label}",
                })
            elif isinstance(field.widget, forms.PasswordInput):
                field.widget.attrs.update({
                    'class': f"{self.default_classes} w-full",
                })
            elif isinstance(field.widget, forms.Select):
                field.widget.attrs.update({
                    'class': f"{self.default_classes} w-full",
                })
            elif isinstance(field.widget, forms.EmailInput):
                field.widget.attrs.update({
                    'class': f'{self.default_classes} w-full',
                    "placeholder": f"Enter {field.label}: example@example.example",
                })