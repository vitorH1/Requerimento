from marcacao import create_app, db

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Descomente a linha abaixo para criar todas as tabelas ao iniciar
        # db.create_all()
    
        # Para desenvolvimento
        app.run(debug=True)
    
        # Para produção usando waitress
        # from waitress import serve
        # serve(app, host='0.0.0.0', port=5050)