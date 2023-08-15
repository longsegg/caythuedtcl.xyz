window.addEventListener("DOMContentLoaded", function () {
  cay_phan_hang.last_ranking_choose();
  cay_phan_hang.so_tran_thue_choose();
  cay_phan_hang.check_sieu_toc();
  cay_phan_hang.check_one_champ();
  cay_phan_hang.phan_hang_add_cart();
  jQuery('input[name="142-ct-rank-mod"]').on("click", function () {
    cay_elo.rank_mod_choose();
  });
  cay_elo.rank_1_choose();
  cay_elo.rank_2_choose();
  cay_elo.diem_cong_choose();
  cay_elo.check_sieu_toc();
  cay_elo.check_one_champ();
  cay_elo.elo_add_cart();

  cay_dtcl.rank_1_choose();
  cay_dtcl.rank_2_choose();
  cay_dtcl.diem_cong_choose();
  cay_dtcl.check_sieu_toc();
  cay_dtcl.elo_add_cart();

  cay_cao_thu.check_diem_1();
  cay_cao_thu.check_diem_2();
  cay_cao_thu.check_sieu_toc();
  jQuery('input[name="158-ct-rank-mod"]').on("click", function () {
    cay_cao_thu.rank_mod_choose(this);
  });
  cay_cao_thu.cay_diem_add_to_cart();

  cay_thong_thao.champion_name();
  cay_thong_thao.rank_1_choose();
  cay_thong_thao.rank_2_choose();
  cay_thong_thao.check_sieu_toc();
  cay_thong_thao.thong_thao_cart();
});

let cay_cao_thu = {
  diem_hien_tai: 0,
  mod: "Rank Đơn",
  mod_price: 13000,
  diem_mong_muon: 0,
  cay_sieu_toc: 0,
  amount: 0,
  note: "",
  rank_mod_choose: function (input) {
    let mod_1 = jQuery("input#158-ct-rank-don");
    if (mod_1.is(":checked") == true) {
      cay_cao_thu.rank_mod = 1;
      cay_cao_thu.mod = "Rank Đơn";
    }
    let mod_2 = jQuery("input#158-ct-rank-dong");
    if (mod_2.is(":checked") == true) {
      cay_cao_thu.rank_mod = 2;
      cay_cao_thu.mod = "Rank Động";
    }
    let mod_3 = jQuery("input#158-ct-rank-dtcl");
    if (mod_3.is(":checked") == true) {
      cay_cao_thu.rank_mod = 3;
      cay_cao_thu.mod = "Rank ĐTCL";
    }
    cay_cao_thu.mod_price = jQuery(input).val();
    cay_cao_thu.cay_diem_amount();
  },
  check_diem_1: function () {
    jQuery("input#158-current_point").on("change", function () {
      cay_cao_thu.diem_hien_tai = jQuery(this).val();
      cay_cao_thu.cay_diem_amount();
    });
  },
  check_diem_2: function () {
    jQuery("input#158-desire_point").on("change", function () {
      if (parseInt(jQuery(this).val()) > parseInt(cay_cao_thu.diem_hien_tai)) {
        cay_cao_thu.diem_mong_muon = jQuery(this).val();
        cay_cao_thu.cay_diem_amount();
      } else {
        alert("Điểm mong muốn phải lớn hơn điểm hiện tại");
      }
    });
  },
  check_sieu_toc: function () {
    jQuery("input#158-ct-cap-toc").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_cao_thu.cay_sieu_toc = 1;
      } else {
        cay_cao_thu.cay_sieu_toc = 0;
      }
      cay_cao_thu.cay_diem_amount();
    });
  },
  cay_diem_amount: function () {
    amount = 0;
    note =
      "Điểm hiện tại: " +
      cay_cao_thu.diem_hien_tai +
      " - Điểm mong muốn: " +
      cay_cao_thu.diem_mong_muon +
      " - " +
      cay_cao_thu.mod;
    if (parseInt(cay_cao_thu.diem_mong_muon) > 0) {
      amount =
        (parseInt(cay_cao_thu.diem_mong_muon) -
          parseInt(cay_cao_thu.diem_hien_tai)) *
        parseInt(cay_cao_thu.mod_price);
    }
    if (cay_cao_thu.cay_sieu_toc == 1) {
      amount = amount * 1.5;
      note += " - Cày cấp tốc (+50%)";
    }
    cay_cao_thu.amount = amount;
    cay_cao_thu.note = note;
    jQuery(".158-ct-form-price>p.price>span.amount").html(
      formatPrice(cay_cao_thu.amount)
    );
  },
  cay_diem_add_to_cart: function () {
    jQuery("button.158-ct-button.ct-button").on("click", function (e) {
      e.preventDefault();
      let note =
        "Điểm hiện tại: " +
        cay_cao_thu.diem_hien_tai +
        " - Điểm mong muốn: " +
        cay_cao_thu.diem_mong_muon;
      jQuery
        .ajax({
          url: add_cart_ajax.ajax_url,
          method: "POST",
          data: {
            action: "custom_add_to_cart",
            id: "158",
            price: parseInt(cay_cao_thu.amount),
            note: cay_cao_thu.note,
          },
        })
        .done(function (response) {
          if (response.error != "undefined" && response.error) {
            return true;
          } else {
            window.location.href = add_cart_ajax.checkout_url;
          }
        });
    });
  },
};

let cay_dtcl = {
  rank_1: "0",
  rank_1_name: "Sắt 4",
  rank_2: "0",
  rank_2_name: "Sắt 3",
  cay_sieu_toc: 0,
  diem_moi_van: "",
  gia_them: 0,
  amount: 40000,
  rank_1_choose: function () {
    jQuery("#155-current_ranking").on("change", function () {
      cay_dtcl.rank_1 = parseInt(jQuery(this).val());
      cay_dtcl.rank_1_name = jQuery(
        "#155-current_ranking option:selected"
      ).text();
      jQuery("#155-desire_ranking option").each(function () {
        if (parseInt(jQuery(this).attr("value")) < cay_dtcl.rank_1) {
          jQuery(this).hide();
        } else {
          jQuery(this).show();
        }
        if (parseInt(jQuery(this).attr("value")) == cay_dtcl.rank_1) {
          jQuery(this).prop("selected", "selected");
          cay_dtcl.rank_2 = parseInt(jQuery("#155-desire_ranking").val());
          cay_dtcl.rank_2_name = jQuery(
            "#155-desire_ranking option:selected"
          ).text();
        }
      });
      cay_dtcl.elo_amount();
    });
  },
  rank_2_choose: function () {
    jQuery("#155-desire_ranking").on("change", function () {
      cay_dtcl.rank_2 = parseInt(jQuery(this).val());
      cay_dtcl.rank_2_name = jQuery(
        "#155-desire_ranking option:selected"
      ).text();
      cay_dtcl.elo_amount();
    });
  },
  check_sieu_toc: function () {
    jQuery("input#155-ct-cap-toc").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_dtcl.cay_sieu_toc = 1;
      } else {
        cay_dtcl.cay_sieu_toc = 0;
      }
      cay_dtcl.elo_amount();
    });
  },
  diem_cong_choose: function () {
    jQuery("#155-point_per_game").on("change", function () {
      cay_dtcl.gia_them = parseInt(jQuery(this).val());
      cay_dtcl.diem_moi_van = jQuery(
        "#155-point_per_game option:selected"
      ).text();
      cay_dtcl.elo_amount();
    });
  },
  elo_amount: function () {
    var amount = 0;
    jQuery("#155-desire_ranking option").each(function () {
      if (
        parseInt(jQuery(this).attr("value")) >= cay_dtcl.rank_1 &&
        parseInt(jQuery(this).attr("value")) <= cay_dtcl.rank_2
      ) {
        amount += parseInt(jQuery(this).data("price_don"));
      }
    });
    cay_dtcl.amount =
      parseInt(amount) +
      Math.round(
        (parseInt(amount) * (parseInt(cay_dtcl.gia_them) * 0.01)) / 1000
      ) *
        1000;
    if (cay_dtcl.cay_sieu_toc == 1) {
      cay_dtcl.amount = cay_dtcl.amount * 1.5;
    }
    jQuery(".155-ct-form-price>p.price>span.amount").html(
      formatPrice(cay_dtcl.amount)
    );
  },
  elo_add_cart: function () {
    jQuery("button.155-ct-button.ct-button").on("click", function (e) {
      e.preventDefault();
      let note =
        "Hạng hiện tại: " +
        cay_dtcl.rank_1_name +
        " - Rank mong muốn: " +
        cay_dtcl.rank_2_name;
      jQuery
        .ajax({
          url: add_cart_ajax.ajax_url,
          method: "POST",
          data: {
            action: "custom_add_to_cart",
            id: "155",
            price: parseInt(cay_dtcl.amount),
            note: note,
          },
        })
        .done(function (response) {
          if (response.error != "undefined" && response.error) {
            return true;
          } else {
            window.location.href = add_cart_ajax.checkout_url;
          }
        });
    });
  },
};

let cay_thong_thao = {
  rank_1: "0",
  rank_1_name: "Thông thạo 1",
  rank_2: "0",
  rank_2_name: "Thông thạo 2",
  champion: "",
  cay_sieu_toc: 0,
  amount: 30000,
  note: "",
  champion_name: function () {
    jQuery("input#211-ct-tuong").on("keyup", function () {
      cay_thong_thao.champion = jQuery(this).val();
    });
  },
  rank_1_choose: function () {
    jQuery("#211-current_ranking").on("change", function () {
      cay_thong_thao.rank_1 = parseInt(jQuery(this).val());
      cay_thong_thao.rank_1_name = jQuery(
        "#211-current_ranking option:selected"
      ).text();
      jQuery("#211-desire_ranking option").each(function () {
        if (parseInt(jQuery(this).attr("value")) < cay_thong_thao.rank_1) {
          jQuery(this).hide();
        } else {
          jQuery(this).show();
        }
        if (parseInt(jQuery(this).attr("value")) == cay_thong_thao.rank_1) {
          jQuery(this).prop("selected", "selected");
          cay_thong_thao.rank_2 = parseInt(jQuery("#211-desire_ranking").val());
          cay_thong_thao.rank_2_name = jQuery(
            "#211-desire_ranking option:selected"
          ).text();
        }
      });
      cay_thong_thao.thong_thao_amount();
    });
  },
  rank_2_choose: function () {
    jQuery("#211-desire_ranking").on("change", function () {
      cay_thong_thao.rank_2 = parseInt(jQuery(this).val());
      cay_thong_thao.rank_2_name = jQuery(
        "#211-desire_ranking option:selected"
      ).text();
      cay_thong_thao.thong_thao_amount();
    });
  },
  check_sieu_toc: function () {
    jQuery("input#211-ct-cap-toc").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_thong_thao.cay_sieu_toc = 1;
      } else {
        cay_thong_thao.cay_sieu_toc = 0;
      }
      cay_thong_thao.thong_thao_amount();
    });
  },
  thong_thao_amount: function () {
    var amount = 0;
    cay_thong_thao.note =
      "Tướng: " +
      cay_thong_thao.champion +
      " - Thông thạo hiện tại: " +
      cay_thong_thao.rank_1_name +
      " - Thông thạo muốn: " +
      cay_thong_thao.rank_2_name;
    jQuery("#211-desire_ranking option").each(function () {
      if (
        parseInt(jQuery(this).attr("value")) >= cay_thong_thao.rank_1 &&
        parseInt(jQuery(this).attr("value")) <= cay_thong_thao.rank_2
      ) {
        amount += parseInt(jQuery(this).data("price_don"));
      }
    });
    cay_thong_thao.amount = amount;
    if (cay_thong_thao.cay_sieu_toc == 1) {
      cay_thong_thao.amount = cay_thong_thao.amount * 1.5;
      cay_thong_thao.note += " - Cày cấp tốc (+50%)";
    }
    jQuery(".211-ct-form-price>p.price>span.amount").html(
      formatPrice(cay_thong_thao.amount)
    );
  },
  thong_thao_cart: function () {
    jQuery("button.211-ct-button.ct-button").on("click", function (e) {
      e.preventDefault();
      jQuery
        .ajax({
          url: add_cart_ajax.ajax_url,
          method: "POST",
          data: {
            action: "custom_add_to_cart",
            id: "211",
            price: parseInt(cay_thong_thao.amount),
            note: cay_thong_thao.note,
          },
        })
        .done(function (response) {
          if (response.error != "undefined" && response.error) {
            return true;
          } else {
            window.location.href = add_cart_ajax.checkout_url;
          }
        });
    });
  },
};

let cay_elo = {
  rank_mod: 1,
  rank_1: "0",
  rank_1_name: "Sắt 4",
  rank_2: "0",
  rank_2_name: "Sắt 3",
  rank_price: 50000,
  cay_sieu_toc: 0,
  one_champ: 0,
  diem_moi_van: "",
  gia_them: 0,
  amount: 50000,
  note: "",
  rank_mod_choose: function () {
    let mod_1 = jQuery("input#142-ct-rank-don");
    if (mod_1.is(":checked") == true) {
      cay_elo.rank_mod = 1;
    }
    let mod_2 = jQuery("input#142-ct-rank-dong");
    if (mod_2.is(":checked") == true) {
      cay_elo.rank_mod = 2;
    }
    cay_elo.elo_amount();
  },
  rank_1_choose: function () {
    jQuery("#142-current_ranking").on("change", function () {
      cay_elo.rank_1 = parseInt(jQuery(this).val());
      cay_elo.rank_1_name = jQuery(
        "#142-current_ranking option:selected"
      ).text();
      jQuery("#142-desire_ranking option").each(function () {
        if (parseInt(jQuery(this).attr("value")) < cay_elo.rank_1) {
          jQuery(this).hide();
        } else {
          jQuery(this).show();
        }
        if (parseInt(jQuery(this).attr("value")) == cay_elo.rank_1) {
          jQuery(this).prop("selected", "selected");
          cay_elo.rank_2 = parseInt(jQuery("#142-desire_ranking").val());
          cay_elo.rank_2_name = jQuery(
            "#142-desire_ranking option:selected"
          ).text();
        }
      });
      cay_elo.elo_amount();
    });
  },
  rank_2_choose: function () {
    jQuery("#142-desire_ranking").on("change", function () {
      cay_elo.rank_2 = parseInt(jQuery(this).val());
      cay_elo.rank_2_name = jQuery(
        "#142-desire_ranking option:selected"
      ).text();
      cay_elo.elo_amount();
    });
  },
  check_sieu_toc: function () {
    jQuery("input#142-ct-cap-toc").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_elo.one_champ = 1;
      } else {
        cay_elo.one_champ = 0;
      }
      cay_elo.elo_amount();
    });
  },
  check_one_champ: function () {
    jQuery("input#142-ct-one-champ").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_elo.cay_sieu_toc = 1;
      } else {
        cay_elo.cay_sieu_toc = 0;
      }
      cay_elo.elo_amount();
    });
  },
  diem_cong_choose: function () {
    jQuery("#142-point_per_game").on("change", function () {
      cay_elo.gia_them = parseInt(jQuery(this).val());
      cay_elo.diem_moi_van = jQuery(
        "#142-point_per_game option:selected"
      ).text();
      cay_elo.elo_amount();
    });
  },
  elo_amount: function () {
    if (cay_elo.rank_mod == 1) {
      mod = "Cày hạng Đơn";
    } else {
      mod = "Cày hạng động";
    }
    cay_elo.note =
      "Hạng hiện tại: " +
      cay_elo.rank_1_name +
      " - Rank mong muốn: " +
      cay_elo.rank_2_name +
      " - " +
      mod +
      " - Điểm mỗi ván: " +
      cay_elo.diem_moi_van;
    var amount = 0;
    jQuery("#142-desire_ranking option").each(function () {
      if (
        parseInt(jQuery(this).attr("value")) >= cay_elo.rank_1 &&
        parseInt(jQuery(this).attr("value")) <= cay_elo.rank_2
      ) {
        if (cay_elo.rank_mod == 1) {
          amount += parseInt(jQuery(this).data("price_don"));
        } else {
          amount += parseInt(jQuery(this).data("price_dong"));
        }
      }
    });
    amount =
      parseInt(amount) +
      Math.round(
        (parseInt(amount) * (parseInt(cay_elo.gia_them) * 0.01)) / 1000
      ) *
        1000;
    cay_elo.amount = amount;
    if (cay_elo.cay_sieu_toc == 1) {
      cay_elo.amount += amount * 0.5;
      cay_elo.note += " - Cày cấp tốc (+50%)";
    }
    if (cay_elo.one_champ == 1) {
      cay_elo.amount += amount * 0.5;
      cay_elo.note += " - Cày One Champ (+50%)";
    }

    jQuery(".142-ct-form-price>p.price>span.amount").html(
      formatPrice(cay_elo.amount)
    );
  },
  elo_add_cart: function () {
    jQuery("button.142-ct-button.ct-button").on("click", function (e) {
      e.preventDefault();

      jQuery
        .ajax({
          url: add_cart_ajax.ajax_url,
          method: "POST",
          data: {
            action: "custom_add_to_cart",
            id: "142",
            price: parseInt(cay_elo.amount),
            note: cay_elo.note,
          },
        })
        .done(function (response) {
          if (response.error != "undefined" && response.error) {
            return true;
          } else {
            window.location.href = add_cart_ajax.checkout_url;
          }
        });
    });
  },
};

let cay_phan_hang = {
  last_ranking: "Chưa từng chơi xếp hạng",
  last_ranking_price: 20000,
  so_tran_thue: 10,
  cay_sieu_toc: 0,
  one_champ: 0,
  amount: 20000,
  note: "",
  last_ranking_choose: function () {
    jQuery("#124-last_season_ranking").on("change", function () {
      cay_phan_hang.last_ranking = jQuery(
        "#124-last_season_ranking option:selected"
      ).text();
      cay_phan_hang.last_ranking_price = jQuery(this).val();
      cay_phan_hang.phan_hang_amount();
    });
  },
  so_tran_thue_choose: function () {
    jQuery("input#124-so-tran").on("change", function () {
      cay_phan_hang.so_tran_thue = jQuery(this).val();
      cay_phan_hang.phan_hang_amount();
    });
  },
  check_sieu_toc: function () {
    jQuery("input#124-ct-cap-toc").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_phan_hang.cay_sieu_toc = 1;
      } else {
        cay_phan_hang.cay_sieu_toc = 0;
      }
      cay_phan_hang.phan_hang_amount();
    });
  },
  check_one_champ: function () {
    jQuery("input#124-ct-one-champ").on("click", function () {
      if (jQuery(this).is(":checked") == true) {
        cay_phan_hang.one_champ = 1;
      } else {
        cay_phan_hang.one_champ = 0;
      }
      cay_phan_hang.phan_hang_amount();
    });
  },
  phan_hang_amount: function () {
    cay_phan_hang.note =
      "Hạng mùa trước: " +
      cay_phan_hang.last_ranking +
      " - Số trận cần thuê: " +
      cay_phan_hang.so_tran_thue;
    let gia =
      parseInt(cay_phan_hang.last_ranking_price) *
      parseInt(cay_phan_hang.so_tran_thue);
    cay_phan_hang.amount = gia;
    if (cay_phan_hang.cay_sieu_toc == 1) {
      cay_phan_hang.amount += gia * 0.5;
      cay_phan_hang.note += " - Cày cấp tốc + 50%";
    }
    if (cay_phan_hang.one_champ == 1) {
      cay_phan_hang.amount += gia * 0.5;
      cay_phan_hang.note += " - Cày One Champ + 50%";
    }
    jQuery(".124-ct-form-price>p.price>span.amount").html(
      formatPrice(cay_phan_hang.amount)
    );
  },
  phan_hang_add_cart: function () {
    jQuery("button.124-ct-button.ct-button").on("click", function (e) {
      e.preventDefault();
      if (cay_phan_hang.so_tran_thue > 10 || cay_phan_hang.so_tran_thue <= 0) {
        arlet("Số trận phải nhỏ hơn 10");
        return;
      }
      jQuery
        .ajax({
          url: add_cart_ajax.ajax_url,
          method: "POST",
          data: {
            action: "custom_add_to_cart",
            id: "124",
            price: cay_phan_hang.amount,
            note: cay_phan_hang.note,
          },
        })
        .done(function (response) {
          if (response.error != "undefined" && response.error) {
            return true;
          } else {
            window.location.href = add_cart_ajax.checkout_url;
          }
        });
    });
  },
};

function formatPrice(price) {
  return (
    new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(price) + " ₫"
  );
}
