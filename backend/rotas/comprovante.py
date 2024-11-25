from flask import Blueprint, jsonify, request

from servicos.comprovante import ComprovanteDatabase


comprovante_blueprint = Blueprint("comprovante", __name__)

@comprovante_blueprint.route("/comprovante", methods=["GET"])
def get_comprovante():
    ClienteCPF = request.args.get("ClienteCPF", "")
    return jsonify(ComprovanteDatabase().get_comprovante(ClienteCPF)), 200