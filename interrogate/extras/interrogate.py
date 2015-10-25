from flask import Flask,render_template,request,jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/dookie')
def makeDookie():
	return render_template('dookie.html')

@app.route('/prisonerResponse', methods=['POST','GET'])
def signUpUser():
	responseData = {"prompt": "thePrompt","level":"1",}
	return request

if __name__ == '__main__':
    app.run(debug=True)
