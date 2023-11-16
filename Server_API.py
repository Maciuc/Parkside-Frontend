from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def load():
    return render_template("/index.html")

@app.route("/index.html")
def load_meniu_principal():
    return render_template("/index.html")

@app.route("/start.html")
def load_login():
    return render_template("/start.html")

@app.route("/feedback.html")
def load_contact():
    return render_template("/feedback.html")


if __name__ == "__main__":
    app.run()