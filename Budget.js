$("form").submit(function (e) {
  e.preventDefault();
  var date = $("input[name='date']").val();
  var expenses = $("input[name='expenses']").val();
  var amount = $("input[name='amount']").val();

  $(".data-table tbody").append(
    "<tr data-date='" +
      date +
      "' data-expenses='" +
      expenses +
      "' data-amount='" +
      amount +
      "'><td>" +
      date +
      "</td><td>" +
      expenses +
      "</td><td>" +
      amount +
      "</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>"
  );

  $("input[name='date']").val("");
  $("input[name='expenses']").val("");
  $("input[name='amount']").val("");
});

$("body").on("click", ".btn-delete", function () {
  $(this).parents("tr").remove();
});

$("body").on("click", ".btn-edit", function () {
  var date = $(this).parents("tr").attr("data-date");
  var expenses = $(this).parents("tr").attr("data-expenses");
  var amount = $(this).parents("tr").attr("data-amount");

  $(this)
    .parents("tr")
    .find("td:eq(0)")
    .html('<input name="edit_date" value="' + date + '">');
  $(this)
    .parents("tr")
    .find("td:eq(1)")
    .html('<input name="edit_expenses" value="' + expenses + '">');
  $(this)
    .parents("tr")
    .find("td:eq(2)")
    .html('<input name="edit_amount" value="' + amount + '">');

  $(this)
    .parents("tr")
    .find("td:eq(3)")
    .prepend(
      "<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>"
    );
  $(this).hide();
});

$("body").on("click", ".btn-cancel", function () {
  var date = $(this).parents("tr").attr("data-date");
  var expenses = $(this).parents("tr").attr("data-expenses");
  var amount = $(this).parents("tr").attr("data-amount");

  $(this).parents("tr").find("td:eq(0)").text(date);
  $(this).parents("tr").find("td:eq(1)").text(expenses);
  $(this).parents("tr").find("td:eq(2)").text(amount);

  $(this).parents("tr").find(".btn-edit").show();
  $(this).parents("tr").find(".btn-update").remove();
  $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function () {
  var date = $(this).parents("tr").find("input[name='edit_date']").val();
  var expenses = $(this)
    .parents("tr")
    .find("input[name='edit_expenses']")
    .val();
  var amount = $(this).parents("tr").find("input[name='edit_amount']").val();

  $(this).parents("tr").find("td:eq(0)").text(date);
  $(this).parents("tr").find("td:eq(1)").text(expenses);
  $(this).parents("tr").find("td:eq(2)").text(amount);

  $(this).parents("tr").attr("data-date", date);
  $(this).parents("tr").attr("data-expenses", expenses);
  $(this).parents("tr").attr("data-amount", amount);

  $(this).parents("tr").find(".btn-edit").show();
  $(this).parents("tr").find(".btn-cancel").remove();
  $(this).parents("tr").find(".btn-update").remove();
});

updateSubTotal(); // Initial call

function updateSubTotal() {
  var table = document.getElementById("data-table");
  let subTotal = Array.from(table.rows)
    .slice(0)
    .reduce((total, row) => {
      return total + parseFloat(row.cells[1].innerHTML);
    }, 0);
  document.getElementById("val").innerHTML =
    "SubTotal = $" + subTotal.toFixed(2);
}
