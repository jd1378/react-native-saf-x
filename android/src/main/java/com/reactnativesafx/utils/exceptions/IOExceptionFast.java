package com.reactnativesafx.utils.exceptions;

import com.facebook.common.util.ExceptionWithNoStacktrace;

import java.io.IOException;

public class IOExceptionFast extends IOException {
  @Override
  public synchronized Throwable fillInStackTrace() {
    return this;
  }

  public IOExceptionFast(final String message) {
    super(message);
  }
}
