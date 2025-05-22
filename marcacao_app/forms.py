from django import forms
from .models import TextoRequerimento

class TextoRequerimentoForm(forms.ModelForm):
    class Meta:
        model = TextoRequerimento
        fields = ['DESCRICAO', 'TEXTO_REQUERIMENTOS']  # Remova CHAVE_REQUERIMENTOS
        widgets = {
            'DESCRICAO': forms.TextInput(attrs={'class': 'form-control'}),
            'TEXTO_REQUERIMENTOS': forms.Textarea(attrs={'class': 'form-control', 'rows': 8}),
        }